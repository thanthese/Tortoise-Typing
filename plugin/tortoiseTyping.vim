" Author      : Stephen Mann
" Date        : May 2010
" Version     : 1.0
" Description : minimal typing tutor for touch-typists
"
" Additional information in the included README.txt


" common start commands
command! TutorialTyping py startTyping()
command! TortoiseTyping py startTyping(
  \ filepath="xmasCarol.txt",
  \ randomize=True,
  \ wordCount=150)
command! -nargs=1 FileTyping py startTyping(
  \ filepath="<args>",
  \ randomize=True,
  \ wordCount=150)

python << EOF
import vim
import time
import re
import random

# constants
# =========

LEADER         = "> "  # appears before prompts on main screen
WIDTH          = 40    # width of shown text to type
CHARS_PER_WORD = 5     # characters per word, for calculating wpm, etc

# order of lines on main screen
SOURCE_LINE    = 0
USER_LINE      = 1
PER_DONE_LINE  = 2
WPM_LINE       = 3
ACC_LINE       = 4

WIN_HEIGHT     = 5                 # height of main window
TITLE          = "TortoiseTyping"  # project title

TUTORIAL = """Start typing what you see here.  Escape will exit.  Don't worry about backspacing -- wrong letters won't advance the cursor.  The line below is your percent complete.  Press tab to toggle that to a fraction.  Below that is your speed in words per minute, and then your accuracy.  Run the program with default settings with the :TortoiseTyping command, or on some file with :FileTyping "yourFile.txt".  Additional options can be found in the README.txt."""

# classes
# =======

class SourceFactory:
  """Build Source instance.

  Source just takes raw text.  This class handles all the
  options.  It locates that text and does formatting work on
  it."""

  def tutorial(self):
    """Return tutorial Source obj."""
    return Source(TUTORIAL)

  def fromFile(self, filepath, randomize, wordCount):
    """Return Source obj based on filepath.

    If 'randomize' then shuffle sentence order.
    If wordCount > 0 then truncate text after that many characters
    """

    # read text from file
    try:
      text = open(filepath).read()
    except IOError:
      return Source("File not found: %s" % filepath)

    # strip out carriage returns and excessive spaces
    text = re.sub("\s+", ' ', text)

    # randomize sentences (crude method)
    if randomize:
      sentences = text.split('.')
      sentences = [s.strip() for s in sentences]
      sentences = [s for s in sentences if s]
      random.shuffle(sentences)
      text = ".  ".join(sentences) + "."

    # truncate text based on word count
    if wordCount > 0:
      charCount = wordCount * CHARS_PER_WORD
      text = text[:charCount]

    return Source(text.strip())

class Source:
  """Source text container, maintains "cursor" position."""

  def __init__(self, source):
    self.index = -1
    self.source = source

  def next(self):
    """Advance "cusor" position by one character, return
    current section of source."""
    if not self.isDone():
      self.index += 1
    return self.source[self.index:self.index + WIDTH]

  def isDone(self):
    """Return if user has run to the end of the source."""
    return self.percentDone() == 100

  def percentDone(self):
    """Return percentage of user through source text."""
    if self.index < 0:
      return 0
    return int(100.0 * self.index / len(self.source))

  def fractionDone(self):
    """Return fraction of user through source text as
    (completed, total)."""
    wordsDone = int(self.index / CHARS_PER_WORD)
    return (wordsDone, self.wordCount())

  def wordCount(self):
    """Return number of words in source text."""
    return int(len(self.source) / CHARS_PER_WORD)

class Accuracy:
  """Maintain user accuracy counts."""

  def __init__(self):
    self.right = 0
    self.wrong = 0

  def getAccuracy(self):
    """Return user accuracy as a percent."""
    total = self.right + self.wrong
    if total == 0:
      return 100
    else:
      return int(100.0 * self.right / total)

  def hasStarted(self):
    """Return that the user has started if they have gotten
    at least one character right."""
    return self.right > 1

  def gotRight(self):
    """Mark that the user got a character right."""
    self.right += 1

  def gotWrong(self):
    """Mark that the user got a character wrong."""
    self.wrong += 1

class WPM:
  """Maintain user wpm statistics."""

  def __init__(self):
    self.time = None
    self.chars = 0
    self.finished = False

  def gotRight(self):
    """Mark that the user got a character right."""
    if not self.time:
      self.time = time.time()
    self.chars += 1

  def getWpm(self):
    """Return user's current words per minute rate, if
    they've started and not finished."""
    if self.chars < 2:
      return 0
    if self.finished:
      return self.finalWpm
    seconds = time.time() - self.time
    charsPerSeconds = (self.chars / seconds)
    return int(charsPerSeconds * (60 / CHARS_PER_WORD))

  def done(self):
    """Mark that user is done; freeze WPM timer and
    stats."""
    self.finalWpm = self.getWpm()
    self.finished = True

# IO
# ==

def startTyping(filepath="", randomize=False, wordCount=0):
  """Initialize program.  Option descriptions at top of
  file."""
  global source, accuracy, wpm, showBar

  # move to plugin directory
  vim.command("silent cd $HOME")
  vim.command("if !(has('win16') || has('win32') || has('win64')) | silent cd vimfiles/bundle/Tortoise-Typing/plugin | else | silent cd .vim/bundle/Tortoise-Typing/plugin | endif")

  # set globals
  if not filepath:
    source = SourceFactory().tutorial()
  else:
    source = SourceFactory().fromFile(filepath, randomize, wordCount)
  accuracy = Accuracy()
  wpm = WPM()
  showBar = True

  # create "pop-up", temporary window
  vim.command("%snew %s" % (WIN_HEIGHT, TITLE))
  vim.command("setlocal buftype=nofile")
  vim.command("setlocal bufhidden=hide")
  vim.command("setlocal noswapfile")
  vim.command("norm! yy%spgg" % (WIN_HEIGHT - 1))  # create blank lines

  # attempt to capture keys (and suppress) for progress bar toggle
  vim.command("inoremap <buffer> <expr> <Tab> ToggleProgressBar()")

  # setup user events
  vim.command("au! CursorMovedI %s python keypress()" % TITLE)
  vim.command("au! InsertLeave %s python endTyping()" % TITLE)

  # draw initial screen
  sourceSect = source.next()
  userSect = ""
  printScreen(sourceSect, userSect)

  # put user in insert mode
  vim.command("startinsert!")

def endTyping():
  """End and clean up after program."""
  vim.command("au! * %s" % TITLE)
  vim.command("bd")

def keypress():
  """Fired on user keypress, functions as the main loop of
  the program."""

  # read user input from the screen
  sourceSect, userSect = getScreen()

  if matches(sourceSect, userSect):

    # advance text
    newUsr = advanceUserSect(userSect)
    newSrc = source.next()

    # mark keypress as correct
    accuracy.gotRight()
    wpm.gotRight()

    # user may be done
    if source.isDone():
      wpm.done()

    printScreen(newSrc, newUsr)
  else:

    # user can only be wrong if already started and not yet done
    if accuracy.hasStarted() and not source.isDone():
      accuracy.gotWrong()

    printScreen(sourceSect, "")

  # force cursor to correct location
  vim.current.window.cursor = (USER_LINE + 1, len(LEADER))

def printScreen(sourceSect, userSect):
  """Print main screen, makes use of global objects."""
  b = vim.current.buffer
  if source.isDone():
    wc = source.wordCount()
    b[SOURCE_LINE] = LEADER + "  ** Done! Word count: %s **" % wc
  else:
    b[SOURCE_LINE] = LEADER + sourceSect
  b[USER_LINE] = LEADER + userSect
  b[ACC_LINE] = "acc: %s%%" % accuracy.getAccuracy()
  if showBar:
    b[PER_DONE_LINE] = pPercentDone(source.percentDone())
  else:
    b[PER_DONE_LINE] = pFractionDone(source.fractionDone())
  b[WPM_LINE] = "wpm: %s" % wpm.getWpm()

def getScreen():
  """Scrape the user's input from the screen."""
  b = vim.current.buffer
  sourceSect = removeLeader(b[SOURCE_LINE])
  userSect   = removeLeader(b[USER_LINE])
  return (sourceSect, userSect)

# pure
# ====

def removeLeader(text):
  """Remove LEADER constant from string."""
  return text[len(LEADER):]

def matches(srcSect, usrSect):
  """Return if the first characters of two strings match."""
  if(srcSect and usrSect):
    return srcSect[0] == usrSect[0]
  return False

def advanceUserSect(usrSect):
  """Advance string by removing first character."""
  return usrSect[1:]

def pPercentDone(percent):
  """Pretty print percentage as a graphical progress bar."""
  p = percent / 100.0
  innerBarWidth = WIDTH - 2 + len(LEADER)
  fillLen = int(innerBarWidth * p)
  fill = "=" * fillLen
  unfill = " " * (innerBarWidth - fillLen)
  return "[" + fill + unfill + "]"

def pFractionDone((word, total)):
  """Pretty print fraction."""
  return "tot: %s / %s words" % (word, total)

EOF

" Toggle the progress bar between percentage to fraction.
function! ToggleProgressBar()
python << EOF
global showBar
showBar = not showBar
EOF
endfunction
