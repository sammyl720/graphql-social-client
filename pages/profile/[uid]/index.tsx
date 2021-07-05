import { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import Loader from '../../../components/design/Loader'
import UserProfile from '../../../components/design/UserProfile'
import { useContext, useEffect } from 'react'
import Context from '../../../context/general/Context'
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next'
import GET_PUBLIC_USER from '../../../graphql/queries/getPublicUser'
import { User } from '../../../interfaces'

function Profile({ id }) {
  const router = useRouter()
  const { loading, error, data } = useQuery(GET_PUBLIC_USER, {
    variables: { id }
  })

  if(loading || !data) return <Loader />
  if(error || data.publicUser.message) {
    console.log(error || data.publicUser.message)
    router.push('/Landing')
  }

  return (
    <div className="text-2xl h-100">
      {data.publicUser.id && (
        <UserProfile user={data.publicUser} />
      )}
    </div>
  )
}

export async function getStaticProps(context:GetStaticPropsContext): Promise<GetStaticPropsResult<{id: string | string[] }>> {
  const { uid } = context.params;

  return {
    props: { id: uid }
  }
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
  return { paths: [ {params: {uid: '60dd79563c9fe215c835772e' }}], fallback: true }
}

export default Profile