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

    const jsonParse = JSON.parse(body);

    return jsonParse
    ? callback(githubParse(jsonParse))
    : callback(
        undefined,
        {
            message: 'parse error',
            status: 502
        }
    );
};
