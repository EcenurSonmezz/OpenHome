package com.example.openHome.Home;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.openHome.Home.Dto.HomeDto;

import java.util.List;

@RestController
@RequestMapping("/api/v1/homes")
public class HomeController {

    @Autowired
    private HomeService homeService;

    @PostMapping
    public HomeDto addHome(@RequestBody HomeDto homeDto) {
        return homeService.addHome(homeDto);
    }

    @GetMapping
    public List<HomeDto> getAllHomes() {
        List<Home> homes = homeService.getAllHomes();
        return homes.stream().map(HomeDto::new).toList();
    }

    @GetMapping("/user")
    public ResponseEntity<List<HomeDto>> getHomesByUserId(@RequestParam Long userId) {
        List<Home> homes = homeService.getHomesByUserId(userId);
        List<HomeDto> homeDtos = homes.stream().map(HomeDto::new).toList();
        return ResponseEntity.ok(homeDtos);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Home> updateHome(@PathVariable Long id, @RequestBody HomeDto homeDto) {
        Home updatedHome = homeService.updateHome(id, homeDto);
        if (updatedHome != null) {
            return ResponseEntity.ok(updatedHome);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHome(@PathVariable Long id) {
        boolean isDeleted = homeService.deleteHome(id);
        if (isDeleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{homeId}")
    public HomeDto getHomeById(@PathVariable Long homeId) {
        return new HomeDto(homeService.getByIdHome(homeId));
    }
}