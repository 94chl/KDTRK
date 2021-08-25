export default function Header({ $target, text }) {
  if (!this) throw new Error("Header 생성 시, new 입력하세요!");

  const $header = document.createElement("h1");

  $target.appendChild($header);

  this.render = () => {
    $header.textContent = text;
  };

  this.render();
}
