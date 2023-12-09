package com.exam.examserver.repo;

import com.exam.examserver.entity.Organization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface OrganizationRepository extends JpaRepository<Organization, String> {
    boolean existsByOrgName(String orgName);

    Organization findByOrgName(String organizationName);

    @Query("SELECT COUNT(*) FROM Organization o")
    public Integer getOrganizationCount();
}
