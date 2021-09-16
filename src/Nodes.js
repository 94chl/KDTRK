export default function Nodes({ $target, initialState, onClick, onPrevClick }) {
  const $nodes = document.createElement("div");
  $nodes.innerText = "CAT PHOTOS";
  $nodes.classList.add("nodes");
  $target.appendChild($nodes);

  this.state = initialState;

  this.setState = (nextState) => {
    try {
      if (typeof nextState !== "object" || Array.isArray(nextState)) {
        console.log("!!!");
        throw new Error("노드 데이터 포멧이 잘못되었습니다.");
      }

      if (JSON.stringify(this.state) !== JSON.stringify(nextState)) {
        this.state = { ...this.state, ...nextState };
        this.render();
      }
    } catch (e) {
      alert(e.message);
    }
  };

  this.render = () => {
    const { isRoot, nodes } = this.state;
    $nodes.innerHTML = `
      ${
        isRoot
          ? ""
          : `<div class="Node">
              <img src="https://cdn.roto.codes/images/prev.png"/>
            </div>`
      }
      ${nodes
        .map(
          (node) =>
            `<div class="Node" data-id="${node.id}">
              <img src="https://cdn.roto.codes/images/${
                node.type === "DIRECTORY" ? `directory` : `file`
              }.png"/>${node.name}
            </div>`
        )
        .join("")}
    `;
  };

  this.render();

  $nodes.addEventListener("click", (e) => {
    const $node = e.target.closest(".Node");
    const { id } = $node.dataset;

    const node = this.state.nodes.find((node) => node.id == id);

    if (node) {
      onClick(node);
    } else {
      // 뒤로가기
      onPrevClick();
    }
  });

  window.addEventListener("keyup", (e) => {
    if (e.key === "Backspace") {
      onPrevClick();
    }
  });
}
