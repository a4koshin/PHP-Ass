<?php

require_once __DIR__ . '/../controllers/ItemController.php';

$method = $_SERVER['REQUEST_METHOD'];
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

if ($uri === '/' || $uri === '') {
    echo json_encode(['message' => 'Lost & Found API running']);
    exit;
}

if ($uri === '/api/items' && $method === 'GET') {
    (new ItemController())->index();
}

if ($uri === '/api/items' && $method === 'POST') {
    (new ItemController())->store();
}

if (preg_match('#^/api/items/(\d+)$#', $uri, $matches)) {
    $id = $matches[1];

    if ($method === 'GET') {
        (new ItemController())->show($id);
    }

    if ($method === 'PUT') {
        (new ItemController())->update($id);
    }

    if ($method === 'DELETE') {
        (new ItemController())->destroy($id);
    }
}

http_response_code(404);
echo json_encode(['message' => 'Route not found']);
exit;
