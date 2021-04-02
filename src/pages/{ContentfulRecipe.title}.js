import { graphql, Link } from "gatsby"
import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { BsClockHistory, BsClock, BsPeople } from "react-icons/bs"
import Layout from "../components/Layout"

const RecipeTemplate = ({ data }) => {
  const {
    title,
    content,
    cookTime,
    prepTime,
    servings,
    description: { description },
    image,
  } = data.contentfulRecipe

  const pathToImage = getImage(image)
  const { ingredients, instructions, tools, tags } = content
  return (
    <Layout>
      <main className="page">
        <div className="recipe-page">
          {/* hero */}
          <section className="recipe-hero">
            <GatsbyImage
              image={pathToImage}
              alt={title}
              className="about-img"
            />
            <article className="recipe-info">
              <h2>{title}</h2>
              <p>{description}</p>
              {/* icons*/}
              <div className="recipe-icons">
                <article>
                  <BsClock />
                  <h5>Prep Time</h5>
                  <p>{prepTime} min.</p>
                </article>
                <article>
                  <BsClockHistory />
                  <h5>Cook Time</h5>
                  <p>{cookTime} min.</p>
                </article>
                <article>
                  <BsPeople />
                  <h5>Servings</h5>
                  <p>{servings}</p>
                </article>
              </div>
              {/* tags */}
              <p className="recipe-tags">
                Tags:{" "}
                {tags.map((tag, index) => {
                  return (
                    <Link to={`$/{tag}`} key={index}>
                      {tag}
                    </Link>
                  )
                })}
              </p>
            </article>
          </section>

          {/*rest of the content*/}

          <section className="recipe-content">
            <article>
              <h4>Instructions</h4>
              {instructions.map((item, index) => {
                return (
                  <div key={index} className="single-instruction">
                    <header>
                      <p>step {index + 1}</p>
                      <div></div>
                    </header>
                    <p>{item}</p>
                  </div>
                )
              })}
            </article>
            <article className="second-column">
              <div>
                <h4>Ingredients</h4>
                {ingredients.map((item, index) => {
                  return (
                    <p key={index} className="single-ingredient">
                      {item}
                    </p>
                  )
                })}
              </div>
              <div>
                <h4>Tools</h4>
                {tools.map((item, index) => {
                  return (
                    <p key={index} className="single-tool">
                      {item}
                    </p>
                  )
                })}
              </div>
            </article>
          </section>
        </div>
      </main>
    </Layout>
  )
}
export const query = graphql`
  query getSingleRecipe($title: String) {
    contentfulRecipe(title: { eq: $title }) {
      cookTime
      title
      content {
        ingredients
        instructions
        tools
        tags
      }
      prepTime
      description {
        description
      }
      servings
      image {
        gatsbyImageData(layout: CONSTRAINED, placeholder: TRACED_SVG)
      }
    }
  }
`
export default RecipeTemplate
