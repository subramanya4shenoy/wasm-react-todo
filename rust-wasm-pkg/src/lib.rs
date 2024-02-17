use wasm_bindgen::prelude::*;
use serde_wasm_bindgen::to_value;

#[wasm_bindgen]
pub struct TodoList {
    items: Vec<String>,
}

#[wasm_bindgen]
impl TodoList {

    #[wasm_bindgen(constructor)]
    pub fn new() -> TodoList {
        TodoList { items: Vec::new() }
    }

    #[wasm_bindgen]
    pub fn add(&mut self, item: String) {
        self.items.push(item);
    }

    #[wasm_bindgen]
    pub fn remove(&mut self, index: usize) {
        if index <self.items.len() {
            self.items.remove(index);
        }
    }

    #[wasm_bindgen]
    pub fn get_item(&self) -> JsValue {
        to_value(&self.items).unwrap_or(JsValue::UNDEFINED)
    }
}