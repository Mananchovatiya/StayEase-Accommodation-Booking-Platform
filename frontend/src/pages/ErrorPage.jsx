function ErrorPage({ message = "Something went wrong" }) {
    return (
        <div className="row mt-3">
            <div className="col-12 col-lg-8 offset-lg-2">
                <div className="alert alert-danger" role="alert">
                    {message}
                </div>
            </div>
        </div>
    );
}

export default ErrorPage;
