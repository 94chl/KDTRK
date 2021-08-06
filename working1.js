// 1번: 트리 순회
// 연결리스트로 트리가 주어질 때
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(node) {
    this.root = node;
  }
}

const tree = new Tree(new Node(9));
tree.root.left = new Node(3);
tree.root.right = new Node(8);
tree.root.left.left = new Node(2);
tree.root.left.right = new Node(5);
tree.root.right.right = new Node(7);
tree.root.left.right.right = new Node(4);

//전위 순회: preorder, 중위 순회: inorder, 후위 순회: postorder

function treeTour(tree, type) {
  let answer = [];
  function preOrder(treeExample) {
    if (treeExample.root) {
      answer.push(treeExample.root.value);
      preOrder(treeExample.root.left);
      preOrder(treeExample.root.right);
    } else {
      answer.push(treeExample.value);
      if (treeExample.left) preOrder(treeExample.left);
      if (treeExample.right) preOrder(treeExample.right);
    }
  }
  function inOrder(treeExample) {
    if (treeExample.root) {
      inOrder(treeExample.root.left);
      answer.push(treeExample.root.value);
      inOrder(treeExample.root.right);
    } else {
      if (treeExample.left) inOrder(treeExample.left);
      answer.push(treeExample.value);
      if (treeExample.right) inOrder(treeExample.right);
    }
  }

  function postOrder(treeExample) {
    if (treeExample.root) {
      postOrder(treeExample.root.left);
      postOrder(treeExample.root.right);
      answer.push(treeExample.root.value);
    } else {
      if (treeExample.left) postOrder(treeExample.left);
      if (treeExample.right) postOrder(treeExample.right);
      answer.push(treeExample.value);
    }
  }

  if (type == "preorder") {
    preOrder(tree);
  } else if (type == "inorder") {
    inOrder(tree);
  } else if (type == "postorder") {
    postOrder(tree);
  }
  return answer;
}

// 2번: 자동완성기능

class trieNode {
  constructor(value = "") {
    this.value = value;
    this.children = new Map();
  }
}

class Trie {
  constructor() {
    this.root = new trieNode();
  }

  insert(string) {
    let currentNode = this.root;

    for (const char of string) {
      if (!currentNode.children.has(char)) {
        currentNode.children.set(char, new trieNode(currentNode.value + char));
      }
      currentNode = currentNode.children.get(char);
    }
  }

  has(string) {
    let currentNode = this.root;

    for (const char of string) {
      if (!currentNode.children.has(char)) {
        return false;
      }
      currentNode = currentNode.children.get(char);
    }

    return true;
  }

  //자동완성 함수
  autoComplete(string) {
    let currentNode = this.root;

    for (const char of string) {
      if (!currentNode.children.has(char)) {
        return "no word";
      }
      currentNode = currentNode.children.get(char);
    }

    let words = [];
    function searchWord(word, making) {
      if (word.length < 1) {
        words.push(string + making);
      }
      for (const next of word) {
        making += next[0];
        if ([...next[1].children]) {
          searchWord([...next[1].children], making);
          making = making.substr(0, making.length - 1);
        }
      }
    }
    searchWord([...currentNode.children], "");

    return words;
  }
}
