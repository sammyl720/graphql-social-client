import { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import Loader from '../../../components/design/Loader'
import Toast from '../../../components/design/Toast'
import UserProfile from '../../../components/design/UserProfile'
import { useContext, useEffect } from 'react'
import Context from '../../../context/general/Context'
import ME from '../../../graphql/queries/me'
import USER from '../../../graphql/queries/user'
import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult, GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next'

function Profile({ id }) {
  const router = useRouter()
  const { loading, setLoading, user, getPublicUser } = useContext(Context)
  useEffect(() => {
    getPublicUser({ variables: { id }})
  }, [])
  if (!user?.id) return <Loader />;
  return (
    <div className="text-2xl h-100">
      {user && (
        <UserProfile user={user} />
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