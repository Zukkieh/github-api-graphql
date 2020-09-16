const github = require('./config');
module.exports = async (after) => {
    const res = await github.query(`
        query {
            search(type: REPOSITORY, query: "stars:>1000", first: 100, after: ${after}) {
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
                pullRequests: pullRequests {
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
    `).catch(error => console.log(error))
    return res;
};