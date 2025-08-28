package com.example.items;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;

import jakarta.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/items")
@Validated
@CrossOrigin(
    origins = "https://psychic-space-giggle-4j6pgjjjrx96h5w7w-3000.app.github.dev",
    allowCredentials = "true"
)
public class ItemController {
    @Autowired
    private ItemRepository repository;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public ItemResponse create(@Valid @RequestBody ItemRequest req) {
        Item saved = repository.save(new Item(req.getName(), req.getDescription()));
        return new ItemResponse(saved.getId(), saved.getName(), saved.getDescription(), saved.getCreatedAt().toString());
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<ItemResponse> all() {
        return repository.findAll().stream()
            .map(i -> new ItemResponse(i.getId(), i.getName(), i.getDescription(), i.getCreatedAt().toString()))
            .collect(Collectors.toList());
    }
}
