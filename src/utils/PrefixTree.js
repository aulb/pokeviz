import PrefixTreeNode from './PrefixTreeNode';

const addWordHelper = (node, str) => {
  if (!node.children[str[0]]) {
    node.children[str[0]] = new PrefixTreeNode(str[0]);
    if (str.length === 1) {
      node.children[str[0]].endWord = true;
    }
  }

  if (str.length > 1) {
    addWordHelper(node.children[str[0]], str.slice(1));
  }
};

const getRemainingTree = (string, tree) => {
  let node = tree;
  let str = string;
  while (str && node) {
    node = node.children[str[0]];
    str = str.substr(1);
  }
  return node;
};

/*
 * Basic trie structure for fast auto suggestion lookup.
 * https://medium.com/@dookpham/predictive-text-autocomplete-using-a-trie-prefix-tree-data-structure-in-javascript-part-1-6ff7fa83c74b
 */
class PrefixTree extends PrefixTreeNode {
  constructor() {
    super(null);
  }

  addWord(string) {
    addWordHelper(this, string)
  }

  predictWord(string) {
    let allWords = [];
    const allWordsHelper = (stringSoFar, tree) => {
    	for (let k in tree.children) {
    		const child = tree.children[k];
    		let newString = stringSoFar + child.value;
    		if (child.endWord) {
    			allWords.push(newString);
    		}
    		allWordsHelper(newString, child);
    	}
    };

    let remainingTree = getRemainingTree(string, this);
    if (remainingTree) {
    	allWordsHelper(string, remainingTree);
    }

    return allWords;
  }
}

export default PrefixTree;
