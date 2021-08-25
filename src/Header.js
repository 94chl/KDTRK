export default function Header({ $target, text }) {
  const $header = document.createElement("h1");

  $target.appendChild($header);
  try {
    this.constructor = () => {
      this.$target = $target;
      this.text = text;
    };

    this.render = () => {
      $header.textContent = text;
    };

    this.render();
  } catch (e) {
    alert(e.message);
  }
}
