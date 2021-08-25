export default function TodoCount({ $target, initialState, onChange }) {
  const $TodoCount = document.createElement("div");
  $target.appendChild($TodoCount);

  this.state = initialState;
  try {
    this.render = () => {
      $TodoCount.innerHTML = `
      <div id="todoCount">${this.state.reduce(
        (acc, cur) => (cur.isCompleted ? ++acc : acc),
        0
      )} / ${this.state.length}</div>
    `;
    };

    this.onChange = (nextState) => {
      onChange(nextState);
    };

    this.render();
  } catch (e) {
    alert(e.message);
  }
}
