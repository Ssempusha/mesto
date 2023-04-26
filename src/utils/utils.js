export default function renderLoading(loading, popup) {
    if (loading) {
      popup.querySelector(".popup__button-save").textContent = "Сохранить";
    } else {
      popup.querySelector(".popup__button-save").textContent = "Сохранение...";
    }
}