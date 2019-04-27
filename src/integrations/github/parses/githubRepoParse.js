module.exports = (body, callback) => {
    const githubParse = (content) => ({
        avatar: content.owner.avatar_url,
        id: content.id,
        name: content.name,
        stars: content.stargazers_count,
        url: {
            owner: content.owner.url,
            repo: content.html_url
        },
        watchers: content.watchers_count
    });

    try {
        return callback(null, githubParse(JSON.parse(body)));
    } catch (error) {
        error.code = 502;
        return callback(error);
    }
};
