import Link from 'next/link'
export default function Post({post}){
    return(
        <div>
            <Link href="/">
                <a>Kembali</a>
            </Link>
            <h2>{post.Title}</h2>
            
        </div>
    )
}

// beritahu nextjs jumlah pages yang ada
export async function getStaticPaths(){
    const res = await fetch('http://localhost:1337/posts')
    const posts = await res.json();

    const paths = posts.map((post)=>({
        params: {slug: post.Slug},
    }))
    return{
        paths,
        fallback: false,
    }
}

// get data untuk setiap page
export async function getStaticProps({params}){
    const {slug} = params;

    const res = await fetch(`http://localhost:1337/posts?Slug=${slug}`)
    const data = await res.json();
    const post = data[0];

    return{
        props:{post}
    }
}