import axios from "axios";
import { useEffect, useState } from "react";

function Feed() {
    const [posts, setPosts] = useState([
        {
            _id: "1",
            url: "https://images.unsplash.com/photo-1768970338809-d88ab5997672?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            caption: "Beautiful scenery",
        }
    ])

    useEffect(() => {
        axios.get("http://localhost:8080/posts")
            .then((res) => {
                console.log(res.data.data)
                setPosts(res.data.data)
            })
    }, [])

    return (
        <section className="feed-section">
            {posts.length > 0 ? (
                posts.map((post) => {
                    return <div key={post._id} className="post-card">
                        <img src={post.image} alt={post.caption} />
                        <p>{post.caption}</p>
                    </div>
                })
            ) : (<h1>You have no posts </h1>)}
        </section>
    )
}

export default Feed;
