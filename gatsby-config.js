/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `The India Out`,
  },
  plugins: [{
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `brands`,
      path: `${__dirname}/brands/`,
    },
  },
  'gatsby-plugin-postcss',],
}
