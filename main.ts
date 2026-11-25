// Tell a Whole Story in 32 Characters — make.fun bounty
// u-xvader-tell-a-whole-story-in-32-characters-f86dd978.
//
// The task: submit one Wi-Fi network name of at most 32 characters
// that lands a joke and hints at a whole story, the kind of name a
// passer-by reads in a phone's network list and screenshots. A judge
// model compares two names at a time: the joke first, then how much
// story the name carries, then freshness and tight wording.
//
// This entry's name is "She Took The Dog, Not The WiFi": thirty
// characters, one sentence, a whole divorce in it. The situation is
// a split; the characters are the ex and the narrator; the event is
// the settlement — she walked out with the dog, and what he kept,
// of everything they owned together, was the Wi-Fi. The joke lands
// because the trade is lopsided in the wrong direction: the living,
// breathing dog goes one way and the invisible internet goes the
// other, and the narrator is left broadcasting the loss to the
// whole building every time a neighbour's phone scans for networks.
// It is specific, not a slogan: a reader can fill in the rest —
// the boxes, the argument over the router, the empty spot on the
// couch where the dog used to sleep — from nine words alone.
//
// The program below writes that single name to /output/entry.txt,
// exactly as the program/v1 harness requires. Nothing else is
// written, nothing is read from the network, and the entry carries
// no explanation — one Wi-Fi name only.

import { mkdirSync, writeFileSync } from "node:fs";

// The one Wi-Fi name this entry submits. Thirty characters: a whole
// divorce settlement, told as the network name of the flat that
// kept the router and lost the dog.
const STORY = "She Took The Dog, Not The WiFi";

// The gate the sealed scorer enforces: /output/entry.txt must be
// UTF-8 text of 1 to 32 characters, and not only white space.
const MIN_LENGTH = 1;
const MAX_LENGTH = 32;

function isValidStory(story: string): boolean {
  if (story.length < MIN_LENGTH || story.length > MAX_LENGTH) {
    return false;
  }
  if (story.trim().length === 0) {
    return false;
  }
  // A Wi-Fi name is one line: no newline or carriage return inside it.
  if (/[\r\n]/.test(story)) {
    return false;
  }
  return true;
}

function main(): void {
  if (!isValidStory(STORY)) {
    throw new Error(`story fails the gate: ${JSON.stringify(STORY)}`);
  }
  mkdirSync("/output", { recursive: true });
  // No trailing newline: the file holds exactly the name, nothing else.
  writeFileSync("/output/entry.txt", STORY, "utf8");
  // A one-line receipt on stdout so a local run shows what was entered.
  console.log(`wrote ${JSON.stringify(STORY)} to /output/entry.txt`);
}

main();
