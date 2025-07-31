import {
  Box,
  Button,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton
} from "@mui/material";
import { CiShoppingCart } from "react-icons/ci";
import { MdClear } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";

import style from "./mystyle.module.css";

export default function QuotationTable({ data, deleteByIndex, clearAll }) {
  if (!data || data.length === 0) {
    return (
      <Box p={2}>
        <Typography variant="h5">Quotation</Typography>
        <Typography variant="body1" color="text.secondary">
          <CiShoppingCart /> No items
        </Typography>
      </Box>
    );
  }
  const totalDiscount = data.reduce((sum, v) => sum + (v.discount || 0), 0);
  const total = data.reduce((acc, v) => acc + (v.qty * v.ppu - v.discount), 0);

  const handleDelete = (index) => {
    deleteByIndex(index);
  };

  return (
    <Box p={2}>
      <Typography variant="h5" gutterBottom>
        Quotation
      </Typography>

      <Button
        variant="outlined"
        color="secondary"
        onClick={clearAll}
        startIcon={<MdClear />}
        sx={{ mb: 2 }}
      >
        Clear
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={style.textCenter}>-</TableCell>
              <TableCell className={style.textCenter}>Qty</TableCell>
              <TableCell className={style.textCenter}>Item</TableCell>
              <TableCell className={style.textCenter}>Price/Unit</TableCell>
              <TableCell className={style.textCenter}>Discount</TableCell>
              <TableCell className={style.textCenter}>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((v, i) => {
              const amount = v.qty * v.ppu - v.discount;
              return (
                <TableRow key={i}>
                  <TableCell className={style.textCenter}>
                    <IconButton onClick={() => handleDelete(i)} size="small">
                      <BsFillTrashFill />
                    </IconButton>
                  </TableCell>
                  <TableCell className={style.textCenter}>{v.qty}</TableCell>
                  <TableCell>{v.item}</TableCell>
                  <TableCell className={style.textCenter}>{v.ppu}</TableCell>
                  <TableCell className={style.textCenter}>{v.discount || 0}</TableCell>
                  <TableCell className={style.textRight}>{amount}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          
          <TableBody>
            <TableRow>
              <TableCell colSpan={5} className={style.textRight}>
                Total Discount
              </TableCell>
              <TableCell className={style.textRight}>{totalDiscount.toLocaleString()}</TableCell>
            </TableRow>
            <TableRow></TableRow>
            <TableRow>
              <TableCell colSpan={5} className={style.textRight}>
                Total
              </TableCell>
              <TableCell className={style.textRight}>{total}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}