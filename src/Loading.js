export default function Loading({ $target }) {
  const $loading = document.createElement("div");
  $loading.className = "Loading";
  $target.appendChild($loading);

  this.setState = (nextState) => {
    try {
      if (typeof nextState !== "boolean") {
        throw new Error("로딩 중 오류가 발생했습니다.");
      }

      if (JSON.stringify(this.state) !== JSON.stringify(nextState)) {
        this.state = nextState;
        this.render();
      }
    } catch (e) {
      alert(e.message);
    }
  };

  this.render = () => {
    $loading.style.display = this.state ? "block" : "none";
    $loading.innerHTML = `
      <div class="content">
        <img src="https://cdn.roto.codes/images/nyan-cat.gif"/>
      </div>
    `;
  };

  this.render();
}
