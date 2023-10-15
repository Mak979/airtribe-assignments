class Validator {
    static validateUserInfo(userInfo) {
        
        if(userInfo.hasOwnProperty("email") &&
            userInfo.hasOwnProperty("fullname") &&
            userInfo.hasOwnProperty("password") &&
            userInfo.hasOwnProperty("country") &&
            userInfo.hasOwnProperty("language") &&
            userInfo.hasOwnProperty("category") && 
            this.validateEmail(userInfo.email) && 
            this.validateCategory(userInfo.category) && 
            this.validatelanguage(userInfo.language) && 
            this.validateCountry(userInfo.country)) {
                return {
                    "status": true,
                    "message": "User has been added"
                }
            }
            else {
                return {
                    "status": false,
                    "message": "please provide all the required parameters"
                }
            }
    }

    static validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    static validateCategory(category) {
        const supportedCategoryList = ["business", "entertainment", "general", "health", "science", "sports", "technology"]
        return supportedCategoryList.includes(category)
    }

    static validatelanguage(lang) {
        const supportedLanguages = ["ar", "de", "en", "es", "fr", "he", "it", "nl", "no", "pt", "ru", "sv", "ud", "zh"]
        return supportedLanguages.includes(lang)
    }

    static validateCountry(country) {
        const supportedCountries = ["ae", "ar", "at", "au", "be", "bg", "br", "ca", "ch", "cn", "co", "cu", "cz", "de", "eg", "fr", "gb", "gr", "hk", "hu", "id", "ie", "il", "in", "it", "jp", "kr", "lt", "lv", "ma", "mx", "my", "ng", "nl", "no", "nz", "ph", "pl", "pt", "ro", "rs", "ru", "sa", "se", "sg", "si", "sk", "th", "tr", "tw", "ua", "us", "ve", "za"]
        return supportedCountries.includes(country)
    }
}

module.exports = Validator