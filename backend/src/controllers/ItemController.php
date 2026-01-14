<?php

require_once __DIR__ . '/../models/Item.php';
require_once __DIR__ . '/../core/Response.php';

class ItemController
{
    private Item $item;

    public function __construct()
    {
        $this->item = new Item();
    }

    public function index()
    {
        Response::json($this->item->all());
    }

    public function show($id)
    {
        $data = $this->item->find($id);

        if (!$data) {
            Response::json(['message' => 'Item not found'], 404);
        }

        Response::json($data);
    }

    public function store()
    {
        $data = json_decode(file_get_contents("php://input"), true);
        $this->item->create($data);
        Response::json(['message' => 'Item created'], 201);
    }

    public function update($id)
    {
        $data = json_decode(file_get_contents("php://input"), true);
        $this->item->update($id, $data);
        Response::json(['message' => 'Item updated']);
    }

    public function destroy($id)
    {
        $this->item->delete($id);
        Response::json(['message' => 'Item deleted']);
    }
}
