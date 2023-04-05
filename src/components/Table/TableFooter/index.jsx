import {
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiChevronUp,
  FiChevronsLeft,
  FiChevronsRight,
} from 'react-icons/fi'

import { Container, PerPage, PerPageContent, PerPageItens } from './styles'

const TableFooter = ({
  perPage,
  page,
  perPageOpen,
  totalPages,
  totalRows,
  setPerPageOpen,
  handlePerPage,
  setPage,
  handleSetPage,
  ...rest
}) => {
  return (
    <Container {...rest}>
      <PerPageContent>
        <PerPage>
          <span>Exibidos:</span>
          <span>
            {page === totalPages ? totalRows : page * perPage} de {totalRows}
          </span>
          <span>Linhas por página:</span>
          <div onClick={() => setPerPageOpen(!perPageOpen)}>
            {perPage}
            {perPageOpen ? <FiChevronUp /> : <FiChevronDown />}
          </div>
        </PerPage>
        {perPageOpen && (
          <PerPageItens>
            <span onClick={() => handlePerPage(5)}>5</span>
            <span onClick={() => handlePerPage(10)}>10</span>
            <span onClick={() => handlePerPage(15)}>15</span>
          </PerPageItens>
        )}
      </PerPageContent>

      <button onClick={() => setPage(1)}>
        <FiChevronsLeft />
      </button>
      <button onClick={() => handleSetPage(-1)}>
        <FiChevronLeft />
      </button>

      <span>
        {page} de {totalPages}
      </span>

      <button onClick={() => handleSetPage(1)}>
        <FiChevronRight />
      </button>
      <button onClick={() => setPage(totalPages)}>
        <FiChevronsRight />
      </button>
    </Container>
  )
}

export { TableFooter }
