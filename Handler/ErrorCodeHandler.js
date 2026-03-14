module.exports = class ErrorCodeHandler {
    url_error() {
        return [999, 'No such resource']
    }

    goSql_error() {
        return [998, 'Database query error']
    }

    data_type_error_id() {
        return [600, 'Invalid data type provided, ID should be a number']
    }

    empty_request_body_error() {
        return [700, 'Request body is empty']
    }

    missing_column_error(column) {
        return [710, `Missing column: ${column}`]
    }
}

