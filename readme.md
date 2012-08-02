# Description

TortoiseTyping is a minimal typing tutor aimed at touch-typists who would like to spend a few minutes a week sharpening their skills.

This script is called TortoiseTyping because with typing its slow, steady, and accurate wins the race.

Compatible with Vim 7.2 and above.  Requires the Vim was compiled with the python switch, which will be true for almost all modern distributions.

# Quick Start

Escape ends the program.

Run the `:TutorialTyping` command to start the two-minute tutorial.

Run the `:TortoiseTyping` command to start the program with default settings: "A Christmas Carol" text, shuffled sentence order, and 150 word session.

Run the `:FileTyping <filepath> `command to start like `:TortoiseTyping`, but with the file `<filepath>` of your choice.

# Advanced Options and Features

The main screen has a progress bar showing percent completion through text.  (Use the tab key to toggle graphical/fraction representation.)  Below that are words per minute and accuracy statistics.

Main program options:

- filepath: choose source file
- randomize: whether or not to shuffle sentence order
- wordcount: truncates source to wordcount number of words

The main entry point into the program is the python startTyping() function.  The `:TortoiseTyping` command calls it like this:

    command! TortoiseTyping py startTyping(
      \ filepath="xmasCarol.txt",
      \ randomize=True,
      \ wordCount=150)

Feel free to use combinations of commands, mappings, and functions to customize how the program starts.

# Licensing

This work is distributed as is, and I make no guarantee that it won't trash your system.  As always when trying new things, it makes good sense to save what you're working on first.

Feel free to modify and distribute this script in any way, so long as you credit me and send me an email if you do anything cool with it.

# Installation

Unzip `tortoiseTyping.zip` into `~/.vim/plugin/` and (re)start vim.

This command

    ls ~/.vim/plugin/tortoiseTyping/

should yield this:

    README.txt
    tortoiseTyping.vim
    xmasCarol.txt
