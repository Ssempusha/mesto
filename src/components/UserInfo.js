export default class UserInfo {
    constructor({ elementName, elementJob, elementAvatar }) {
        this._elementName = elementName;
        this._elementJob = elementJob;
        this._elementAvatar = elementAvatar;
    }
    
    getUserInfo() {
        return {
            name: this._elementName.textContent,
            about: this._elementJob.textContent,
          };
    }

    setUserInfo({ name, about }) {
        this._elementName.textContent = name;
        this._elementJob.textContent = about;
    }

    setUserAvatar({ avatar }) {
        this._elementAvatar.src = avatar;
    }
};