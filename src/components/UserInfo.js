export default class UserInfo {
    constructor({ elementName, elementJob }) {
        this._elementName = elementName;
        this._elementJob = elementJob;
    }
    
    getUserInfo() {
        return {
            name: this._elementName.textContent,
            job: this._elementJob.textContent,
          };
    }

    setUserInfo(nameInput, jobInput) {
        this._elementName.textContent = nameInput.value;
        this._elementJob.textContent = jobInput.value;
    }
};