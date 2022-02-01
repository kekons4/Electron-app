function formatMessage(username, txt) {
    return {
        username,
        txt,
        time: new Date()
    }
}

module.exports = formatMessage;