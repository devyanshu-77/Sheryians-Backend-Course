import axios from "axios";

function CreatePost() {

    function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target)
        console.log(formData)
        axios.post("http://localhost:8080/create-post", formData)
            .then((res) => {
                console.log(res)
                alert("Post created successfully")
                e.target.reset();
            }).catch((err) => {
                console.log(err)
                alert("Error creating post")
            })
    }

    return (
        <section className="create-post-section">
            <h1>Create Post</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" name="image" accept="image/*" />
                <input type="text" name="caption" placeholder="Enter Caption" accept="image/*" />
                <button type="submit" >Submit</button>
            </form>
        </section>
    )
}

export default CreatePost;
