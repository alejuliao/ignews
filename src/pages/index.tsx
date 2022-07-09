import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { SubscribeButton } from '../components/SubsribeButton'
import { stripe } from '../services/stripe'
import styles from './home.module.scss'
interface HomeProps {
  product:{
    priceId: string;
    amount: number
  }
}
export default function Home({product}:HomeProps){
  console.log(product)
  return (
    <>
    <Head>
      <title>Home | ig news</title>
    </Head>
    <main className={styles.contentContainer}>
      <section className={styles.hero}>
    <span>👏🏻 Hey, welcome</span>
    <h1>News about the <span>React</span> World</h1>
    <p>Get acess to all the publication<br/>
      <span>for {product.amount} month</span>
    </p>
    <SubscribeButton/>
      </section>
      <img src="/images/avatar.svg" alt="Girl coding" />
    </main>
  </>
  )
}

// export default Home

export const getStaticProps: GetStaticProps = async () =>{
  const price = await stripe.prices.retrieve('price_1LJgAQEVeRU0XF3Sfx584HpQ',
   {expand: ['product']}
   )

   const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US',{
      style: 'currency',
      currency: 'USD'
    }).format(price.unit_amount / 100),
   }
  return {
    props:{
      product
    },
    revalidate: 60*60*24,//24 hours
  }
}
