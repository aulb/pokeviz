/* Simple trie node */
class PrefixTreeNode {
  constructor(value) {
    this.children = {};
    this.endWord = false;
    this.value = value;
  }
}

export default PrefixTreeNode;
