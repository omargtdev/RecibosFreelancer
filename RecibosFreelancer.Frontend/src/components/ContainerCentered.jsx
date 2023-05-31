
function ContainerCentered({ children }) {
    return (
        <div className="d-flex align-items-center" style={{ height: "100vh" }}>
            <div className="d-flex justify-content-center align-items-center flex-grow-1">
            {children}    
            </div>
        </div>
    )
}

export default ContainerCentered;