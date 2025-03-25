import React from 'react';
import {DataBlog} from "@/utils/Users";
import CardBlog from "@/components/module/CardBlog";
import Title from "@/components/template/Title";


function BlogPage(props) {
    return (
        <>
            <div className="block md:hidden">
                <Title name="وبلاگ" />
            </div>
            <div className="container m-auto flex flex-col items-start justify-between mt-10 md:mt-16">
                {DataBlog.map((items) => <CardBlog data={items} key={items.id} />)}
            </div>
        </>
    );
}

export default BlogPage;