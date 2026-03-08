
module.exports = class Handler{
    countFrequency(inputString, targetChar){
        let count = 0
        for (const index in inputString) {
            //console.log(`countFrequency: ${inputString[index]}`)
            if ( inputString[index] === targetChar) {
                count++
            }
        }
        return count
    }

    splitRegex(str, applyFilter){
        if (applyFilter) {
            return str.split(/(<=|>=|=|<|>|\$)/).filter(segment => segment !== "")
        } 
        else {
            return str.split(/(<=|>=|=|<|>|\$)/)
        }
    }

    genErrorMessage(code, msg){
        return `{
            "status": "fail", 
            "error_code": "${code}", 
            "error_message": "${msg}"
        }`
    }

    genSuccessMessage(data) {
        return {
            'status': 'success',
            'error_code': '000',
            'error_message': 'nil',
            'data': data
        }
    }

    splitArray(arr) {
        return arr.join(',').split(',')
    }
}