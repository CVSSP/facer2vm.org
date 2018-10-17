gohugo-theme-wumpus
===================

A nice theme for the static website generator [Hugo][HUGO].

Visually based on the Attila theme for Ghost, but with...

- (author) Multiple authoring
- (author) Companies
- (author) Groups (of companies and/or people)
- (tech) Proper CSS parallax
- (tech) No z-index (proper HTML structuring)
- (tech) Flex (and no float)
- (tech) No jQuery

What we lost...

- (author) Disqus. Will add when time permits.
- (author) Syntax highlighting. I think this is done differently in Hugo.
  Will look into when situation arises.
- (author) Some kind of jQuery gallery script.
- (visitor?) Some kind of jQuery history script.

Despite all this, there seems to be a tiny but measurable performance hit on
render speed. Overall we actually gained speed, due to dramatic improvements
from scripting, but rendering/painting itself is a fraction slower. The exact
cause remains to be investigated. Is it z-index, flex/float, the CSS parallax,
HTML sturcture, larger CSS paths? For now it's fast enough and about 50% saved
on script time.


Install
-------

TODO.


Configuration
-------------

TODO.


Licence
-------

Copyright 2018, Paul Koppen.

[MIT][MIT].



[HUGO]: //gohugo.io/
[MIT]: LICENCE.md
