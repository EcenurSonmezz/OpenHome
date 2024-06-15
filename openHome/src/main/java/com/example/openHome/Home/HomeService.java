package com.example.openHome.Home;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import com.example.openHome.Home.Dto.HomeDto;
import com.example.openHome.Users.User;
import com.example.openHome.Users.UserRepository;

@Service
public class HomeService {

    @Autowired
    private HomeRepository homeRepository;

    @Autowired
    private UserRepository userRepository;

    public HomeDto addHome(HomeDto homeDto) {
        User user = userRepository.findById(homeDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Home home = new Home();
        home.setAddress(homeDto.getAddress());
        home.setRooms(homeDto.getRooms());
        home.setPrice(homeDto.getPrice());
        home.setAvailability(homeDto.isAvailability());
        home.setImage(homeDto.getImage() != null ? homeDto.getImage().getBytes() : null);
        home.setUser(user);
        home = homeRepository.save(home);
        return new HomeDto(home);
    }

    public List<Home> getAllHomes() {
        return homeRepository.findAll();
    }

    public Home updateHome(Long id, HomeDto homeDto) {
        Optional<Home> optionalHome = homeRepository.findById(id);
        if (optionalHome.isPresent()) {
            Home home = optionalHome.get();
            home.setAddress(homeDto.getAddress());
            home.setRooms(homeDto.getRooms());
            home.setPrice(homeDto.getPrice());
            home.setAvailability(homeDto.isAvailability());
            home.setImage(homeDto.getImage() != null ? homeDto.getImage().getBytes() : null);
            return homeRepository.save(home);
        } else {
            return null;
        }
    }

    public boolean deleteHome(Long id) {
        Optional<Home> optionalHome = homeRepository.findById(id);
        if (optionalHome.isPresent()) {
            homeRepository.delete(optionalHome.get());
            return true;
        } else {
            return false;
        }
    }

    public List<Home> getHomesByUserId(Long userId) {
        return homeRepository.findByUser_Id(userId);
    }

    public Home getByIdHome(Long homeId) {
        return homeRepository.findById(homeId).orElse(null);
    }
}