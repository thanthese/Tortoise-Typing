# Description

TortoiseTyping is a minimal typing tutor aimed at touch-typists who would like to spend a few minutes a week sharpening their skills.

This script is called TortoiseTyping because with typing its slow, steady, and accurate wins the race.

Compatible with Vim 7.2 and above.  Requires the Vim was compiled with the python switch, which will be true for almost all modern distributions.

# Quick Start

Note: RandomTyping and PunctuationTyping needs *nodejs* installed on your system. https://nodejs.org/en/

`<esc>` ends the program.

`:TutorialTyping` starts the two-minute tutorial.

`:TortoiseTyping` starts the program with default settings: "A Christmas Carol" text, shuffled sentence order, and 150 word session.

`:FileTyping <filepath>` starts like `:TortoiseTyping`, but with the file `<filepath>` of your choice.

`:RandomTyping <wordCount> <language>` starts like `:TortoiseTyping`, but with Random Words from typings.gg.
eg. `:RandomTyping 150 english1000`

`:PunctuationTyping <wordCount> <language>` starts like `:RandomTyping`, but with Uppercase and Punctuations.
eg. `:PunctuationTyping 150 english1000`

# Random and Punctuation Typing Languages

- english
- italian
- german
- spanish
- chinese
- korean
- english1000
- polish
- punjabi
- swedish
- french
- portuguese

# Advanced Options and Features

The main screen has a progress bar showing percent completion through text.  Use the tab key to toggle graphical/fraction representation.  Below that are words-per-minute and accuracy statistics.

Main program options:

- `filepath`: choose source file
- `randomize`: whether or not to shuffle sentence order
- `wordcount`: truncates source to wordcount number of words

The main entry point into the program is the python `startTyping()` function.  The `:TortoiseTyping` command calls it like this:

```vim
command! TortoiseTyping py startTyping(
  \ filepath  = "xmasCarol.txt",
  \ randomize = True,
  \ wordCount = 150)
```

Feel free to use combinations of commands, mappings, and functions to customize how the program starts.

# Installation

If using [Vundle](https://github.com/gmarik/vundle/), add

    Bundle 'devinceble/Tortoise-Typing'

to your vundle file and run `:BundleInstall`.

Otherwise, just make sure that

- `tortoiseTyping.vim` is in `plugins`
- `xmasCarol.txt` is in `/.vim/bundle/Tortoise-Typing/plugin`

# Development

If you'd like to get involved in the project, there are some open bugs and enhancements. Send me a pull request!

# Licensing

This work is distributed as is, and I make no guarantee that it won't trash your system.  As always when trying new things, it makes good sense to save what you're working on first.

Feel free to modify and distribute this script in any way, so long as you credit me and send me an email if you do anything cool with it.
