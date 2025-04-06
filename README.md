# Scroll-Simulator
A calculator that evaluates the odds of Cursed Scrolls in Vesteria

### Vesteria
Vesteria is an MMOPRG on Roblox in which the main gameplay loop is upgrading weapons.

The core item for this is the Cursed Scroll, an upgrade item that randomly increases item stats; while they are not the best upgrade item on average, their randomization allows them to get far higher results than other upgraders with good luck. Players invest much time in Vesteria gambling for better items using these.

It has fairly simple mechanics on paper; it selects a primary roll and two bonus rolls from a weight table and applies them both with a set chance based on the item's stats. The exact parameters aren't directly exposed in-game, but through various leaks have gone public; it is still difficult to use them to evaluate odds.

### This Simulator
I created this to help players evaluate items they're planning to upgrade. Given an item's initial stats (a list of stats on the item & the primary/bonus rolls of all preceding Cursed Scrolls), I am able to calculate the exact odds of every combination of 0, 1 or 2 bonus rolls being applied. Those in turn can be used to evaluate the overall chances of getting any number of a particular stat and the distribution of "points" (used to track how strong an item is) given by the next scroll.

The simulator has two inputs: the stat checkboxes to the top left of the page and the scroll inputs along the top. Players can enter the rolls from each preceding cursed scroll (or the points for any non-cursed scrolls), and then check the corresponding box on the left for each stat that is on their item not already covered by the scrolls. That information is used for the simulations.

The three outputs of the simulator include the large table, the points table, and the summary:
- The large table includes the probability for every combination of rolls the next Cursed Scroll can give, with either none, one, or both stat rolls applied. It gives more detail than a typical player would need.
- The points table to the bottom left shows the probability of getting exactly (or at least) every possible number of points from the next Cursed Scroll, and the total number of points their item would have given that number and the information from the inputs.
- The summary to the bottom, similarly to the points table, shows the probability of getting exactly (or at least) every possible number of stats for each possible stat the next Cursed Scroll can give, along with the main roll to the far right.

The calculator has four modes, accessible to the top left, one for each type of upgradable item in the game: weapons, armor, headgear & offhands. Weapons take seven attack upgrades, armor take seven defense upgrades, headgear take three headgear upgrades (which give bonus rolls from armor upgrades) and offhands, depending on the exact subtype, can take three of either attack or defense upgrades.
