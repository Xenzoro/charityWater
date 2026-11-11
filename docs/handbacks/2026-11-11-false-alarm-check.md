# False alarm: the daily check's failed check

The red card said charityWater's latest check failed. It didn't. The failed run was XenMain's Copies workflow
(run 43009010513, Copy XenHub): Xenzoro/XenHub's own 2026-11-10 design commits clash with XenMain, and the drift
card for that already exists. Nothing in charityWater changed.

Milestone: none

## Why it showed here

XenHub's daily check runs `gh run list` in each project's folder (`XenHub/server/src/dailyCheck.ts`, checkRuns).
A folder in XenMain has no repo of its own, so gh reads XenMain's runs, and every project shows XenMain's newest
failed run. The fix belongs to XenHub: a folder without its own `.git` should only count the workflows named
after it.

## Found on the way

The XenHub copy clash: c96182c2 had already brought every line of the old repo's work over by hand, so a
merge that keeps main's files and has the old repo's tip as its second parent lets the copy add on again (tested
locally with xen-main-copy: it adds on, and the files match XenHub's folder). Not pushed, since this round was
told to stop.
