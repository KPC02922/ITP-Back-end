module.exports = class ErrorCodeHandler {
    url_error() {
        return [999, 'No such resource']
    }

    goSql_error() {
        return [998, 'Database query error']
    }
}

