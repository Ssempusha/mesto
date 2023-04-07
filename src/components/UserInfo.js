export default class UserInfo {
    constructor({ elementName, elementJob }) {
        this._elementName = elementName;
        this._elementJob = elementJob;
    }
    
    getUserInfo() {
        return {
            userName: this._elementName.textContent,
            userJob: this._elementJob.textContent,
          };
    }

    setUserInfo(name, job) {
        this._elementName.textContent = name;
        this._elementJob.textContent = job;
    }
};