package com.dmly.ecommerce.config;

import com.dmly.ecommerce.entiry.Country;
import com.dmly.ecommerce.entiry.Product;
import com.dmly.ecommerce.entiry.ProductCategory;
import com.dmly.ecommerce.entiry.State;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
public class DataRestConfig implements RepositoryRestConfigurer {

    private EntityManager entityManager;

    @Autowired
    public DataRestConfig(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {

        HttpMethod[] unsupportedMethods = {HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE};

        disableHttpMethods(Product.class, config, unsupportedMethods);
        disableHttpMethods(ProductCategory.class, config, unsupportedMethods);
        disableHttpMethods(Country.class, config, unsupportedMethods);
        disableHttpMethods(State.class, config, unsupportedMethods);

        exposeIds(config);
    }

    private void disableHttpMethods(Class<?> aClass,  RepositoryRestConfiguration config, HttpMethod[] unsupportedMethods) {
        config.getExposureConfiguration()
                .forDomainType(aClass)
                .withItemExposure((metadata, httpMethods) -> httpMethods.disable(unsupportedMethods))
                .withCollectionExposure((metadata, httpMethods) -> httpMethods.disable(unsupportedMethods));
    }

    private void exposeIds(RepositoryRestConfiguration config) {

        Set<EntityType<?>> entityTypes = entityManager.getMetamodel().getEntities();

        List<Class<?>> classList = new ArrayList<>();

        entityTypes.forEach(entityType -> classList.add(entityType.getJavaType()));

        Class[] domainTypes = classList.toArray(new Class[0]);
        config.exposeIdsFor(domainTypes);

    }
}
