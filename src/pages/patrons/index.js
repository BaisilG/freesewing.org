import React, { useEffect } from 'react'
import useApp from '../../hooks/useApp'
import withLanguage from '../../components/withLanguage'
import AppWrapper from '../../components/app/wrapper'
import WideLayout from '../../components/layouts/wide'
import CenteredLayout from '../../components/layouts/centered'

import Button from '@material-ui/core/Button'
import Blockquote from '@freesewing/components/Blockquote'
import { FormattedMessage } from 'react-intl'
import PatronStars from '../../components/patron-stars'
import UserSocial from '../../components/user-social'
import { graphql, Link } from 'gatsby'

const PatronPage = (props) => {
  // Hooks
  const app = useApp()

  // Effects
  useEffect(() => {
    app.setTitle(app.translate('app.patrons'))
  }, [])

  // Styles
  const styles = {
    patron: {
      width: '150px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '2rem',
      textAlign: 'center'
    },
    avatar: {
      width: 'calc(100% - 15px)',
      borderRadius: '50%',
      background: '#000'
    },
    list: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    username: {
      fontWeight: 'bold',
      fontFamily: "'Roboto Condensed', sans-serif",
      margin: '-0.5rem 0 0.5rem 0'
    }
  }

  // Preprocess data
  const patrons = {}
  props.data.allFsPatron.edges.map(
    (node) => (patrons[node.node.patron.username] = node.node.patron)
  )

  const order = Object.keys(patrons)
  order.sort()
  const list = []
  order.map((username) => {
    let patron = patrons[username]
    list.push(
      <div key={patron.handle} style={styles.patron}>
        <Link to={'/users/' + patron.username}>
          <img
            style={styles.avatar}
            src={patron.pictureUris.m}
            alt={patron.username}
            className="shadow"
          />
        </Link>
        <div>
          <PatronStars tier={patron.tier} />
        </div>
        <div style={styles.username}>{patron.username}</div>
        <div style={styles.social}>
          <UserSocial accounts={patron.social} />
        </div>
      </div>
    )
    return null
  })
  return (
    <AppWrapper app={app}>
      <CenteredLayout app={app} top noTitle>
        <Blockquote type="note">
          <h6>
            <FormattedMessage id="app.supportFreesewing" />
          </h6>
          <p>
            <FormattedMessage id="account.patronInfo" />
          </p>
          <p>
            <Button variant="contained" color="primary" size="large" href="/patrons/join/">
              <FormattedMessage id="app.becomeAPatron" />
            </Button>
          </p>
        </Blockquote>
      </CenteredLayout>
      <WideLayout app={app} top>
        <div style={styles.list}>{list}</div>
      </WideLayout>
    </AppWrapper>
  )
}

export default withLanguage(PatronPage)

// See https://www.gatsbyjs.org/docs/page-query/
export const pageQuery = graphql`
  {
    allFsPatron {
      edges {
        node {
          patron {
            username
            pictureUris {
              m
            }
            social {
              twitter
              instagram
              github
            }
            handle
            tier
          }
        }
      }
    }
  }
`
