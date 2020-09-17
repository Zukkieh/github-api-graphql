const github = require('./config');
module.exports = async (after) => {
    const res = await github.query(`
        query {
            search(type: REPOSITORY, query: "stars:>1000", first: 10, after: ${after}) {
            repositoryCount
            pageInfo{
                endCursor
            }
            nodes {
                ... on Repository {
                nameWithOwner
                createdAt
                updatedAt
                primaryLanguage {
                    name
                }
                releases {
                    totalCount
                }
                pullRequests: pullRequests(states: MERGED) {
                    totalCount
                }
                closedIssues: issues(states: CLOSED) {
                    totalCount
                }
                openIssues: issues(states: OPEN) {
                    totalCount
                }
                }
            }
            }
        }  
    `)
    return res;
};