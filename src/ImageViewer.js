export default function ImageViewer({ $target, onClose }) {
  const $imageViewer = document.createElement("div");
  $imageViewer.className = "ImageViewer Modal";
  $target.appendChild($imageViewer);

  this.state = { selectedImageUrl: undefined };

  this.setState = (nextState) => {
    try {
      if (typeof nextState !== "object") {
        throw new Error("이미지 데이터 포멧이 잘못되었습니다.");
      }

      if (this.state !== nextState) {
        this.state = nextState;
        this.render();
      }
    } catch (e) {
      alert(e.message);
    }
  };

  this.render = () => {
    $imageViewer.style.display = this.state.selectedImageUrl ? "block" : "none";
    $imageViewer.innerHTML = `
      <div class="content">
        <img src="${this.state.selectedImageUrl}"/>
      </div>
    `;
  };

  this.render();

  window.addEventListener("keyup", (e) => {
    if (e.key === "Escape") onClose();
  });

  window.addEventListener("click", (e) => {
    if (Array.from(e.target.classList).includes("Modal")) onClose();
  });
}
