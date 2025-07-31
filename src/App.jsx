import { useState, useRef } from "react";
import QuotationTable from "./QuotationTable";
import {
  Box,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button
} from "@mui/material";
import products from './products.json'; 

function App() {
  const itemRef = useRef();
  const ppuRef = useRef();
  const qtyRef = useRef();
  const discountRef = useRef();

  const [dataItems, setDataItems] = useState([]);
  const [ppu, setPpu] = useState(products[0].price);

  const addItem = () => {
  if (!itemRef.current || !ppuRef.current || !qtyRef.current || !discountRef.current) return;

  const itemData = products.find((v) => itemRef.current.value === v.code);
  const name = itemData.name;
  const price = parseFloat(ppuRef.current.value || "0");
  const qty = parseInt(qtyRef.current.value || "0");
  const discount = parseFloat(discountRef.current.value || "0");
  const amount = qty * price - discount;

  const newItem = {
    item: name,
    ppu: price,
    qty: qty,
    discount: discount,
    amount: amount,
  };

  const existingIndex = dataItems.findIndex(
    (it) => it.item === name && parseFloat(it.ppu) === price
  );

  if (existingIndex !== -1) {
    const updatedItems = [...dataItems];
    const existing = updatedItems[existingIndex];

    const mergedQty = existing.qty + qty;
    const mergedDiscount = existing.discount + discount;
    const mergedAmount = mergedQty * price - mergedDiscount;

    updatedItems[existingIndex] = {
      ...existing,
      qty: mergedQty,
      discount: mergedDiscount,
      amount: mergedAmount,
    };

    setDataItems(updatedItems);
  } else {
    setDataItems([...dataItems, newItem]);
  }
};

  const deleteByIndex = (index) => {
    let newDataItems = [...dataItems];
    newDataItems.splice(index, 1);
    setDataItems(newDataItems);
  };

  const clearAll = () => {
    setDataItems([]);
  };

  const productChange = () => {
    const item = products.find((v) => itemRef.current.value === v.code);
    setPpu(item.price);
  };
  
  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
 
        <Grid item xs={12} md={4}>
          <Box sx={{ backgroundColor: "#e4e4e4", p: 2, borderRadius: 1 }}>
            <Typography variant="subtitle1" gutterBottom>Item</Typography>
            <FormControl fullWidth margin="dense">
              <InputLabel>Item</InputLabel>
              <Select
                inputRef={itemRef}
                //defaultValue={products[0].code}
                label="Item"
                onChange={productChange}
              >
                {products.map((p) => (
                  <MenuItem key={p.code} value={p.code}>
                    {p.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              margin="dense"
              label="Price Per Unit"
              type="number"
              inputRef={ppuRef}
              value={ppu}
              onChange={(e) => setPpu(ppuRef.current.value)}
            />

            <TextField
              fullWidth
              margin="dense"
              label="Quantity"
              type="number"
              inputRef={qtyRef}
              defaultValue={1}
            />
            <TextField
              fullWidth
              margin="dense"
              label="Discount"
              type="number"
              inputProps={{ min: 0 }}
              inputRef={discountRef}
              defaultValue={0}
            />

            <Box mt={2}>
              <Button variant="contained" fullWidth onClick={addItem}>
                Add
              </Button>
            </Box>
          </Box>
        </Grid>
        
        <Grid item xs={12} md={8}>
          <QuotationTable
            data={dataItems}
            deleteByIndex={deleteByIndex}
            clearAll={clearAll}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;