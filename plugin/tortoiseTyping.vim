if exists("g:loaded_tortoiseTyping")
   finish
endif
let g:loaded_tortoiseTyping = 1

let s:keepcpo = &cpo
set cpo&vim

" common start commands
command! TutorialTyping call tortoiseTyping#TutorialTyping()
command! TortoiseTyping call tortoiseTyping#TortoiseTyping()
command! -nargs=1 FileTyping call tortoiseTyping#FileTyping("<args>")
command! -nargs=* RandomTyping call tortoiseTyping#RandomTyping(<f-args>)
command! -nargs=* PunctuationTyping call tortoiseTyping#PunctuationTyping(<f-args>)

let &cpo= s:keepcpo
unlet s:keepcpo
