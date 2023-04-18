import { Pagination } from "react-bootstrap";

// currentPage=當前活動頁碼，totalPages=總頁數，onPageChange=當用戶單擊頁碼時將調用的函數
const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
    const pageItems = [];
    for (let page = 1; page <= totalPages; page++) {
        pageItems.push(
            <Pagination.Item
                key={page}
                active={page === currentPage}
                onClick={() => onPageChange(page)}
            >
                {page}
            </Pagination.Item>
        );
    }
    
    return(
        <Pagination>
            <Pagination.First onClick={() => onPageChange(1)} />
            <Pagination.Prev 
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            />
            {pageItems} 
            <Pagination.Next 
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            />
            <Pagination.Last 
                onClick={() => onPageChange(totalPages)} 
            />
        </Pagination>
    )
}

export default PaginationComponent;