const DEFAULT_AVATAR_IMAGE = 'img/muffin-grey.svg';
const WRONG_PICTURE_MESSAGE = 'Неверная фотография';
const ACCEPT_PICTURE_MESSAGE = 'Фотография выбрана';

const checkCustomValidity = (control) => {
  switch (true) {
    case control.validity.valueMissing:
      control.setCustomValidity('Это поле обязательно для заполнения');
      break;

    case control.validity.rangeOverflow:
      control.setCustomValidity(`Максимальное значение для этого поля: ${control.max}`);
      break;

    case control.validity.rangeUnderflow:
      control.setCustomValidity(`Минимальное значение для этого поля: ${control.min}`);
      break;

    case control.validity.tooShort:
      control.setCustomValidity(`Это поле должно содержать не менее ${control.minLength} символов (ещё хотя бы ${control.minLength - control.value.length})`);
      break;

    case control.validity.tooLong:
      control.setCustomValidity(`Это поле должно содержать не более ${control.maxLength} символов`);
      break;

    case control.validity.badInput:
      control.setCustomValidity('Это поле должно содержать число');
      break;

    default:
      control.setCustomValidity('');
      break;
  }
};

const checkAndLoadImage = (fileInputElement, imageElement) => {
  const file = fileInputElement.files[0];

  if (!file.type.match('image/*')) {
    fileInputElement.setCustomValidity('Это поле может содержать только изображение');
    imageElement.src = DEFAULT_AVATAR_IMAGE;
    imageElement.title = WRONG_PICTURE_MESSAGE;
  } else {
    fileInputElement.setCustomValidity('');
    const fileReader = new FileReader();

    fileReader.addEventListener('load', () => {
      imageElement.src = fileReader.result;
      imageElement.title = ACCEPT_PICTURE_MESSAGE;
    });

    fileReader.readAsDataURL(file);
  }
};

export { checkCustomValidity, checkAndLoadImage};
